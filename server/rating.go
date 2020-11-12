package main

import (
	"github.com/mattermost/mattermost-server/v5/model"
)

// Rating represents a MH Score
type Rating struct {
	ID       string `json:"id"`
	Score    int    `json:"score"`
	CreateAt int64  `json:"create_at"`
}

func newRating(score int) *Rating {
	return &Rating{
		ID:       model.NewId(),
		Score:    score,
		CreateAt: model.GetMillis(),
	}
}
