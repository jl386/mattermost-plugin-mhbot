package main

import (
	"github.com/mattermost/mattermost-server/v5/model"
)

// Rating represents a MH Score
type Rating struct {
	ID       string `json:"id"`
	Score    int    `json:"score"`
	CreateAt int64  `json:"create_at"`
	Notes    string `json:"notes"`
}

func newRating(notes string, score int) *Rating {
	return &Rating{
		ID:       model.NewId(),
		Score:    score,
		CreateAt: model.GetMillis(),
		Notes:    notes,
	}
}
