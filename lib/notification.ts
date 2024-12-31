'use server'
import  webpush from  "web-push"
webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_BASE_URL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
let subscription: PushSubscription | null = null
 
export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}
 
export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(formData:FormData) {
  const message = formData.get("message") as string
  if (!subscription) {
    throw new Error('No subscription available')
  }
  await webpush.sendNotification(

      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icons/icon1.png',
      })
    )
}