// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

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
