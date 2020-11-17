# Head Coach

Joe Leveridge's submission for Mattermost Hackfest 2020.

## Demo

Please see link to a short video summarising the problem statement and showing the working prototype:
[Summary Video and Prototype Demo](https://biteable.com/watch/hackathon-2020-2728140)

## Features

The Head Coach plugin helps you to regularly take a moment to reflect on how you are feeling.

The Mattermost 'Head Coach' will send you a daily reminder message to rate "How is your emotional health today?" through a simple UI. You can also make a note of any specific factors that are contributing to your current mental state.

Head Coach will acknowledge your submission and provide guidance on you can either improve your mental state or share your energy with others.

## Screenshots

### Main View

Icon showing doctor with stethoscope in header menu opens sidebar view.

![Plugin View](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Rate_Score.png?raw=true)

The emotion is highlighted once it has been clicked. User can type an optional note in the notes field and submit by clicking the share button.

![Plugin View Selected Option](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Rate_Score3.png?raw=true)

After your first submission, your last rating will be shown at the top of the bar.

![enter image description here](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Rate_Score2.png?raw=true)

### Information (Help) Modal

If you click the Help icon you are presented with further information about the bot.

![Information Modal](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Info_Modal.png?raw=true)

### Score Guidance

Once you have shared your rating, the bot acknowledges your submission and provides some guidance based on your rating.

| Excellent                                                                                                                       | Good                                                                                                                  | Average                                                                                                                     | Poor                                                                                                                  | Terrible                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ![Excellent Feedback](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Feedback_Excellent.png?raw=true) | ![Good Feedback](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Feedback_Good.png?raw=true) | ![Average Feedback](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Feedback_Average.png?raw=true) | ![Poor Feedback](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Feedback_Poor.png?raw=true) | ![Terrible Feedback](https://github.com/jl386/mattermost-plugin-mhbot/blob/master/screenshots/Feedback_Terrible.png?raw=true) |

## To Do

This is just the beginning! Some of the features I wanted to look at but ran out of time include:

-   **Trends** (Ability to view your last X scores and notes on a chart)

-   **Trend Analysis** (Head Coach bot to notice when you take a leap or a dip, send a congratulatory GIF when you move from good->excellent, or send further guidance when you fall from average->poor).

-   **Circle of Trust** (Configure your closely trusted private circle to which you automatically share your scores/trends. Friends can be notified to reach out when you are feeling low)

-   **Mental Health First Aid** (Head Coach connects you to an available mental health first aider.)

    -   Mattermost: Automatically create the direct channel. Through sidebar, provide the first aider with conversation starters which can be automatically posted on their behalf when clicked)

    -   Jitsi: Automatically kick-off a video call with your designated first aider or member of circle of trust
