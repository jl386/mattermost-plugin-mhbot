package main

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/mattermost/mattermost-server/v5/model"
	"github.com/mattermost/mattermost-server/v5/plugin"
)

const commandHelp = `* |/headcoach info | - provide information about this bot.`

const (
	commandTriggerHelp = "help"
	commandTriggerInfo = "info"
)

func getHelp() string {
	return `Available Commands:

add [score]
	Adds a Mental Health Daily Score.

`
}

func getCommand() *model.Command {
	return &model.Command{
		Trigger:          "headcoach",
		DisplayName:      "Mental Health Coach",
		Description:      "Mental Health Coach helps you keep your emotions in check.",
		AutoComplete:     true,
		AutoCompleteDesc: "Available commands: add, help, list",
		AutoCompleteHint: "[command]",
	}
}

func (p *Plugin) postCommandResponse(args *model.CommandArgs, text string) {
	post := &model.Post{
		UserId:    p.botUserID,
		ChannelId: args.ChannelId,
		Message:   text,
	}
	_ = p.API.SendEphemeralPost(args.UserId, post)
}

func (p *Plugin) validateCommand(action string, parameters []string) string {
	switch action {
	case commandTriggerInfo:
		if len(parameters) > 0 {
			return "Info command does not accept any extra parameters"
		}
	}

	return ""
}

func (p *Plugin) executeCommandInfo(args *model.CommandArgs) {
	p.postCommandResponse(args, "Howdy, I'm your virtual Head Coach.\n\nI can help you ensure you keep your emotional health in shape.\n\nEmotional health allows you to work productively and cope with the stresses of everyday life. By checking in on a regular-basis, I will help you become more aware of your emotions and reactions. I will help you notice what in your life makes you sad, frustrated, or angry.\n\nTogether we can help address or change those things over time. If you'd rather to speak to a human (instead of a pesky bot), I will happily assist by matching you with an available Mental Health First Aider.\n\nThanks for taking an interest.\n\nYours forever,\nHead Coach")
}

// ExecuteCommand executes a given command and returns a command response.
func (p *Plugin) ExecuteCommand(c *plugin.Context, args *model.CommandArgs) (*model.CommandResponse, *model.AppError) {
	spaceRegExp := regexp.MustCompile(`\s+`)
	trimmedArgs := spaceRegExp.ReplaceAllString(strings.TrimSpace(args.Command), " ")
	stringArgs := strings.Split(trimmedArgs, " ")
	lengthOfArgs := len(stringArgs)
	restOfArgs := []string{}

	var handler func([]string, *model.CommandArgs) (bool, error)
	if lengthOfArgs == 1 {
		handler = p.runListCommand
	} else {
		command := stringArgs[1]
		if lengthOfArgs > 2 {
			restOfArgs = stringArgs[2:]
		}
		switch command {
		case "add":
			handler = p.runAddCommand
		default:
			p.postCommandResponse(args, getHelp())
			return &model.CommandResponse{}, nil
		}
	}
	isUserError, err := handler(restOfArgs, args)
	if err != nil {
		if isUserError {
			p.postCommandResponse(args, fmt.Sprintf("__Error: %s.__\n\nRun `/todo help` for usage instructions.", err.Error()))
		} else {
			p.API.LogError(err.Error())
			p.postCommandResponse(args, "An unknown error occurred. Please talk to your system administrator for help.")
		}
	}

	return &model.CommandResponse{}, nil
}

func (p *Plugin) runListCommand(args []string, extra *model.CommandArgs) (bool, error) {

	p.API.LogInfo("Run list command")
	return true, nil
}

func (p *Plugin) runAddCommand(args []string, extra *model.CommandArgs) (bool, error) {
	r := strings.Join(args, " ")
	if r == "" {
		p.postCommandResponse(extra, "Please include a score between 1 and 10.")
		return false, nil
	}

	score, err := strconv.Atoi(r)
	if err != nil {
		p.postCommandResponse(extra, "Input must be an integer between 1 and 10.")
		return false, nil
	}

	if score >= 1 && score <= 10 {
		_, err := p.listManager.AddRating(extra.UserId, "", score)
		if err != nil {
			return false, err
		}
		p.postCommandResponse(extra, "Thanks for sharing!")
		return true, nil
	}
	p.postCommandResponse(extra, "Score must be between 1 and 10")
	return false, nil
}
