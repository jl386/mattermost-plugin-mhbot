package main

import "github.com/mattermost/mattermost-server/v5/plugin"

const (
	// MyListKey is the key used to store the list of the owned ratings
	MyListKey = ""
)

// ListStore represents the KVStore operations for lists
type ListStore interface {
	// Score related function
	AddRating(userID string, rating *Rating) error
	// Issue References related functions

	GetList(userID string) ([]*Rating, error)
}

type listManager struct {
	store ListStore
	api   plugin.API
}

// NewListManager creates a new listManager
func NewListManager(api plugin.API) ListManager {
	return &listManager{
		store: NewListStore(api),
		api:   api,
	}
}

func (l *listManager) GetUserName(userID string) string {
	user, err := l.api.GetUser(userID)
	if err != nil {
		return "Someone"
	}
	return user.Username
}

func (l *listManager) AddRating(userID string, score int) (*Rating, error) {

	rating := newRating(score)

	if err := l.store.AddRating(userID, rating); err != nil {
		return nil, err
	}

	return rating, nil
}
