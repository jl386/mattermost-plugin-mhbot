// Elements taken from https://github.com/mattermost/mattermost-plugin-todo/blob/master/webapp/src/components/channel_header_button/channel_header_button.tsx

import React from 'react';

import './channel_header_button.scss';

type Props = {
    shouldHighlight: boolean,
};

export default function ChannelHeaderButton(props: Props) {
    let btnClass = 'icon fa fa-user-md';
    if (props.shouldHighlight) {
        btnClass += ' mhbot-plugin-icon--active';
    }

    return (
        <i className={btnClass}/>
    );
}
