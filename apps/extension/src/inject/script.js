/* eslint-disable */
const BROADCAST_CHANNEL_ID = 'pallad'
const callPalladAsync = ({ method, payload }) =>
  new Promise((resolve, reject) => {
    const privateChannelId = `private-${Math.random()}`
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_ID)
    const responseChannel = new BroadcastChannel(privateChannelId)
    responseChannel.addEventListener('message', ({ data }) => {
      channel.close()
      if (data.error) return reject(data.error)
      return resolve(data.response)
    })
    channel.postMessage({
      method,
      payload,
      isPallad: true,
      respondAt: privateChannelId
    })
  })
const init = () => {
  window.mina = {
    requestNetwork: () => callPalladAsync({ method: 'requestNetwork' }),
    requestAccounts: () => callPalladAsync({ method: 'requestAccounts' })
  }
}
init()
