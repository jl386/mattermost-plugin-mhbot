package main

import (
	"time"

	"github.com/mattermost/mattermost-server/v5/plugin"
)

const (
	// MyListKey is the key used to store the list of the owned ratings
	MyListKey = ""
)

// ListStore represents the KVStore operations for lists
type ListStore interface {
	// Score related function
	AddRating(userID string, rating *Rating) error

	// Issue References related functions
	GetLastRating(userID string) (*Rating, error)
	GetLastRatingList(userID string, number int) ([]*Rating, error)
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

func (l *listManager) AddRating(userID, notes string, score int) (*Rating, error) {

	rating := newRating(notes, score)

	if err := l.store.AddRating(userID, rating); err != nil {
		return nil, err
	}

	return rating, nil
}

func (l *listManager) GetLastRating(userID string) (*Rating, bool, error) {
	// Get last rating
	rating, err := l.store.GetLastRating(userID)
	if err != nil {
		return nil, false, err
	}
	// Check if last rating was shared today
	ca := time.Unix(rating.CreateAt/1000, 0)
	now := time.Now()
	if now.Day() == ca.Day() && now.Month() == ca.Month() && now.Year() == ca.Year() {
		return rating, true, nil
	}
	return rating, false, nil
}

func (l *listManager) GetLastRatingList(userID string, number int) ([]*Rating, error) {
	// Get last rating
	res, err := l.store.GetLastRatingList(userID, number)
	if err != nil {
		return nil, err
	}
	return res, nil
}
