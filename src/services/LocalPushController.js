import PushNotifications from 'react-native-push-notification'
import { Platform } from 'react-native';

PushNotifications.configure({
    onNotification: function(notification) {
        console.log("LOCAL NOTIFICATION => ", notification)
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
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

export const scheduleLocalNotification = (milliseconds, title = "Task Reminders") => {
    PushNotifications.localNotificationSchedule({
        bigText: "Tasker",
        subText: "Task notification",
        title: title,
        message: `Reminder for ${title} task`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: "default",
        actions: '["Yes", "No"]',
        date: new Date(Date.now()+milliseconds),
    })
}