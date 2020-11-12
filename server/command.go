package main

import (
	"fmt"
	"strings"

	"github.com/mattermost/mattermost-server/v5/model"
	"github.com/mattermost/mattermost-server/v5/plugin"
)

const commandHelp = `* |/headcoach info | - provide information about this bot.`

const (
	commandTriggerHelp = "help"
	commandTriggerInfo = "info"
)

func getCommand() *model.Command {
	return &model.Command{
		Trigger:          "headcoach",
		DisplayName:      "Mental Health Coach",
		Description:      "Mental Health Coach helps you keep your emotions in check.",
		AutoComplete:     true,
		AutoCompleteDesc: "Available commands: preview, help, list, set_channel_welcome, get_channel_welcome, delete_channel_welcome",
		AutoCompleteHint: "[command]",
	}
}

func (p *Plugin) postCommandResponse(args *model.CommandArgs, text string, textArgs ...interface{}) {
	post := &model.Post{
		UserId:    p.botUserID,
		ChannelId: args.ChannelId,
		Message:   fmt.Sprintf(text, textArgs...),
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

func (p *Plugin) ExecuteCommand(_ *plugin.Context, args *model.CommandArgs) (*model.CommandResponse, *model.AppError) {
	split := strings.Fields(args.Command)
	command := split[0]
	parameters := []string{}
	action := ""
	if len(split) > 1 {
		action = split[1]
	}
	if len(split) > 2 {
		parameters = split[2:]
	}

	if command != "/headcoach" {
		return &model.CommandResponse{}, nil
	}

	if response := p.validateCommand(action, parameters); response != "" {
		p.postCommandResponse(args, response)
		return &model.CommandResponse{}, nil
	}

	switch action {
	case commandTriggerInfo:
		p.executeCommandInfo(args)
		return &model.CommandResponse{}, nil
	case commandTriggerHelp:
		fallthrough
	case "":
		text := "###### Mattermost Headcoach Plugin - Slash Command Help\n" + strings.ReplaceAll(commandHelp, "|", "`")
		p.postCommandResponse(args, text)
		return &model.CommandResponse{}, nil
	}

	p.postCommandResponse(args, "Unknown action %v", action)
	return &model.CommandResponse{}, nil
}
