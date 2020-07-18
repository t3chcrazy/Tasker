import PushNotifications from 'react-native-push-notification'

PushNotifications.configure({
    onNotification: function(notification) {
        console.log("LOCAL NOTIFICATION => ", notification)
    },
    popInitialNotification: true,
    requestPermissions: true
})

export const LocalNotification = () => {
    PushNotifications.localNotification({
      autoCancel: true,
      bigText:
        'This is local notification demo in React Native app. Only shown, when expanded.',
      subText: 'Local Notification Demo',
      title: 'Local Notification Title',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]'
    })
}

export const scheduleLocalNotification = milliseconds => {
    PushNotifications.localNotificationSchedule({
        bigText: "Notification sent because of react-native-push-notifications",
        subText: "Scheduled notification",
        title: "My app title",
        message: "Expand to see more",
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: "default",
        actions: '["Yes", "No"]',
        date: new Date(Date.now()+milliseconds),
    })
}