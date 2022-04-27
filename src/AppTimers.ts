import { updateQRToken } from 'Api/Endpoints';
import { QrTokenObj } from 'Common/QrToken';
import * as workerTimers from 'worker-timers'

export function initTimers() {
  // 更新qrtoken
  const qrTokenTimer = workerTimers.setInterval(async () => {
    const qrtoken = QrTokenObj.getQrToken()
    if (qrtoken[0] === 'Expired') {
      const [status, resp] = await updateQRToken(qrtoken[1]);
      if (Number(status) >= 200 && Number(status) < 300) {
        const { data } = resp;
        QrTokenObj.setQrToken(data as string)
      }
    }
  }, 1000)

  window.onunload = function () {
    workerTimers.clearInterval(qrTokenTimer)
  }
}