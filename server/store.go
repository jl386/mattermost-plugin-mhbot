package main

import (
	"encoding/json"
	"fmt"

	"github.com/mattermost/mattermost-server/v5/plugin"
	"github.com/pkg/errors"
)

const (
	// StoreRetries is the number of retries to use when storing lists fails on a race
	StoreRetries = 3
	//StoreNewRatingKey is something
	StoreRatingKey = "ratings"
)

func listKey(userID string) string {
	return fmt.Sprintf("%s_%s", StoreRatingKey, userID)
}

type listStore struct {
	api plugin.API
}

// NewListStore creates a new listStore
func NewListStore(api plugin.API) ListStore {
	return &listStore{
		api: api,
	}
}

func (l *listStore) GetList(userID string) ([]*Rating, error) {
	irs, _, err := l.getList(userID)
	return irs, err
}

func (l *listStore) getList(userID string) ([]*Rating, []byte, error) {
	originalJSONList, err := l.api.KVGet(listKey(userID))
	if err != nil {
		return nil, nil, err
	}

	if originalJSONList == nil {
		return []*Rating{}, originalJSONList, nil
	}

	var list []*Rating
	jsonErr := json.Unmarshal(originalJSONList, &list)
	if jsonErr != nil {
		return nil, nil, nil
	}

	return list, originalJSONList, nil
}

func (l *listStore) GetLastRating(userID string) (*Rating, error) {
	list, err := l.GetList(userID)
	if err != nil {
		return nil, nil
	}
	if len(list) == 0 {
		return nil, errors.New("No ratings found")
	}
	lastRating := list[len(list)-1]
	return lastRating, nil
}

func (l *listStore) AddRating(userID string, rating *Rating) error {

	for i := 0; i < StoreRetries; i++ {

		list, originalJSONList, err := l.getList(userID)

		if err != nil {
			return err
		}

		for _, ir := range list {
			if ir.ID == rating.ID {
				return errors.New("issue id already exists in list")
			}
		}

		list = append(list, rating)

		ok, err := l.saveList(userID, list, originalJSONList)
		if err != nil {
			return errors.New("fml save issue")
		}

		// If err is nil but ok is false, then something else updated the installs between the get and set above
		// so we need to try again, otherwise we can return
		if ok {
			return nil
		}
	}
	return errors.New("unable to store NEW nstallation")
}

func (l *listStore) saveList(userID string, list []*Rating, originalJSONList []byte) (bool, error) {
	newJSONList, jsonErr := json.Marshal(list)
	if jsonErr != nil {
		return false, jsonErr
	}

	ok, appErr := l.api.KVCompareAndSet(listKey(userID), originalJSONList, newJSONList)
	if appErr != nil {
		return false, errors.New(appErr.Error())
	}

	return ok, nil
}
