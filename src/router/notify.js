import { writable } from 'svelte/store';

let id = 0;

export const notificationList = writable([]);

export default function notify(message, severity="info", ttl=5) {
    const currentId = id;
    notificationList.update(notifications => {
        notifications.push({
            message,
            severity,
            id: currentId
        });
        setTimeout(() => {
            notificationList.update(notifications => {
                return notifications.filter(notification => notification.id != currentId);
            });
        }, ttl*1000);
        return notifications;
    });
    id += 1;
}
