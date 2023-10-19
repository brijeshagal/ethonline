import * as PushAPI from "@pushprotocol/restapi";
import { privSigner as signer } from "@/utils/signers";
const channel = "0xdD2a64ea2637b938F1E1C28D1dA9e443B28513f9"
export const sendSubsetNotification = async (recipients) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4,
      identityType: 2,
      notification: {
        title: `Tester`,
        body: `This is a tester`,
      },
      payload: {
        title: `Test payload title`,
        body: `sample msg body`,
        cta: "",
        img: "",
      },
      recipients: recipients,
      channel: `eip155:137:${channel}`,
      env: "staging",
    });
    console.log(apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};
export const sendBroadCastNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1,
      identityType: 2,
      notification: {
        title: `Tester`,
        body: `This is a tester`,
      },
      payload: {
        title: `Test payload title`,
        body: `sample msg body`,
        cta: "",
        img: "",
      },
      channel: `eip155:137:${channel}`,
      env: "staging",
    });
    console.log("Notification Sent ✅");
    console.log(apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};
export const userFeeds = async (address) => {
  const apiResponse = await PushAPI.user.getFeeds({
    user: `eip155:5:${address}`, // user address
    raw: true,
    env: 'staging'
  });
  return apiResponse;
};
// broadcast type: 1
// subset notification type: 4
// sendNotification(4, ["eip155:5:0xdD2a64ea2637b938F1E1C28D1dA9e443B28513f9"]);
