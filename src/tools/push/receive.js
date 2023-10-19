// fetch some raw feeds data
const apiResponse = await PushAPI.user.getFeeds({
    user: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // user address
    raw: true,
    env: 'staging'
  });
  // parse it to get a specific shape of object.
  const parsedResults = PushAPI.utils.parseApiResponse(apiResponse);
  
  const [oneNotification] = parsedResults;
  
  const {
    cta,
    title,
    message,
    app,
    icon,
    image,
    url,
    blockchain,
    secret,
    notification
  } = oneNotification;