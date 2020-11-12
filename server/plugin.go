package main

import (
	"fmt"
	"net/http"
	"sync"

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
	AddRating(userID string, score int) (*Rating, error)
	// GetUserName returns the readable username from userID
	GetUserName(userID string) string
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
	case "/test":
		fmt.Fprint(w, "Test passed")
	default:
		//http.NotFound(w, r)
		fmt.Fprint(w, "Welcome to Mental Health Coach!")
	}
}

func (p *Plugin) handleAdd(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	myscore := 10

	_, err := p.listManager.AddRating(userID, myscore)
	if err != nil {
		p.API.LogError("Unable to add rating err=" + err.Error())
		return
	}

}
