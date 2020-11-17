package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/mattermost/mattermost-server/v5/model"
	"github.com/mattermost/mattermost-server/v5/plugin"
	"github.com/pkg/errors"
)

const (
	botUsername    = "headcoach"
	botDisplayName = "Mental Health Coach"
	botDescription = "A mental health bot to help keep your emotional wellness in shape."
)

// ListManager represents the logic on the lists
type ListManager interface {
	// AddRating appends today's rating to the userID's myList
	AddRating(userID, notes string, score int) (*Rating, error)
	GetLastRating(userID string) (*Rating, bool, error)
	GetLastRatingList(userID string, number int) ([]*Rating, error)
}

// Plugin implements the interface expected by the Mattermost server to communicate between the server and plugin processes.
type Plugin struct {
	plugin.MattermostPlugin

	// botUserID of the created bot account.
	botUserID string

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration

	listManager ListManager
}

// OnActivate ensure the bot account exists
// plugin.IconImagePath("assets/heart.svg"),
func (p *Plugin) OnActivate() error {
	bot := &model.Bot{
		Username:    botUsername,
		DisplayName: botDisplayName,
		Description: botDescription,
	}
	options := []plugin.EnsureBotOption{
		plugin.ProfileImagePath("assets/headcoach.png"),
	}

	//ProfileImagePath(botIcon)
	botUserID, ensureBotError := p.Helpers.EnsureBot(bot, options...)
	if ensureBotError != nil {
		return errors.Wrap(ensureBotError, "failed to ensure bot user")
	}
	p.botUserID = botUserID

	p.listManager = NewListManager(p.API)

	err := p.API.RegisterCommand(getCommand())
	if err != nil {
		return errors.Wrap(err, "failed to register command")
	}

	return nil

}

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	switch r.URL.Path {
	case "/add":
		p.handleAdd(w, r)
	case "/getlast":
		p.handleGetLast(w, r)
	case "/getlastlist":
		p.handleGetLastList(w, r)
	case "/test":
		fmt.Fprint(w, "Test passed")
	default:
		//http.NotFound(w, r)
		fmt.Fprint(w, "Welcome to Mental Health Coach!")
	}
}

type addAPIRequest struct {
	Score int    `json:"score"`
	Notes string `json:"notes"`
}

type getLastAPIRequest struct {
	ID        string `json:"id"`
	Score     int    `json:"score"`
	CreatedAt int64  `json:"created_at"`
	Notes     string `json:"notes"`
	Today     bool   `json:"today"`
}

func (p *Plugin) handleAdd(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	var addRequest *addAPIRequest
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&addRequest)
	if err != nil {
		p.API.LogError("Unable to decode JSON err=" + err.Error())
		p.handleErrorWithCode(w, http.StatusBadRequest, "Unable to decode JSON", err)
		return
	}

	myScore := addRequest.Score

	if myScore >= 1 && myScore <= 10 {
		_, err := p.listManager.AddRating(userID, addRequest.Notes, myScore)
		if err != nil {
			p.API.LogError("Unable to add rating err=" + err.Error())
			p.handleErrorWithCode(w, http.StatusBadRequest, "Unable to decode JSON", err)
			return
		}
	} else {
		p.API.LogError("Unable to add rating, nothing with range 1-10 ")
		p.handleErrorWithCode(w, http.StatusBadRequest, "Rating score out of range", err)
		return
	}

}

func (p *Plugin) handleGetLast(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}
	rating, today, err := p.listManager.GetLastRating(userID)
	if err != nil {
		p.API.LogError("Unable to get rating for user err=" + err.Error())
		p.handleErrorWithCode(w, http.StatusInternalServerError, "Unable to get rating for user", err)
		return
	}

	resp := getLastAPIRequest{ID: rating.ID, Score: rating.Score, CreatedAt: rating.CreateAt, Notes: rating.Notes, Today: today}

	// trigger reminder
	if resp.Today == false {

		var lastReminderAt int64
		lastReminderAt, err = p.getLastReminderTimeForUser(userID)
		if err != nil {
			p.API.LogError("Unable to send reminder err=" + err.Error())
			p.handleErrorWithCode(w, http.StatusInternalServerError, "Unable to send reminder", err)
			return
		}

		var timezone *time.Location
		offset, _ := strconv.Atoi(r.Header.Get("X-Timezone-Offset"))
		timezone = time.FixedZone("local", -60*offset)

		now := model.GetMillis()
		nt := time.Unix(now/1000, 0).In(timezone)
		lt := time.Unix(lastReminderAt/1000, 0).In(timezone)

		if nt.Sub(lt).Hours() >= 1 && (nt.Day() != lt.Day() || nt.Month() != lt.Month() || nt.Year() != lt.Year()) {
			p.PostBotDM(userID, "Daily Reminder: Take time to reflect and rate your emotional health!")
			err = p.saveLastReminderTimeForUser(userID)
			if err != nil {
				p.API.LogError("Unable to save last reminder for user err=" + err.Error())
			}
		}
	}

	ratingJSON, err := json.Marshal(resp)
	if err != nil {
		p.API.LogError("Unable marhsal issues list to json err=" + err.Error())
		p.handleErrorWithCode(w, http.StatusInternalServerError, "Unable marhsal issues list to json", err)
		return
	}

	_, err = w.Write(ratingJSON)
	if err != nil {
		p.API.LogError("Unable to write json response err=" + err.Error())
	}
}

func (p *Plugin) handleGetLastList(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}
	ratings, err := p.listManager.GetLastRatingList(userID, 2)
	if err != nil {
		p.API.LogError("Unable to get rating for user err=" + err.Error())
		p.handleErrorWithCode(w, http.StatusInternalServerError, "Unable to get rating for user", err)
		return
	}

	ratingJSON, err := json.Marshal(ratings)
	if err != nil {
		p.API.LogError("Unable marhsal issues list to json err=" + err.Error())
		p.handleErrorWithCode(w, http.StatusInternalServerError, "Unable marhsal issues list to json", err)
		return
	}

	_, err = w.Write(ratingJSON)
	if err != nil {
		p.API.LogError("Unable to write json response err=" + err.Error())
	}
}

func (p *Plugin) handleErrorWithCode(w http.ResponseWriter, code int, errTitle string, err error) {
	w.WriteHeader(code)
	b, _ := json.Marshal(struct {
		Error   string `json:"error"`
		Details string `json:"details"`
	}{
		Error:   errTitle,
		Details: err.Error(),
	})
	_, _ = w.Write(b)
}
