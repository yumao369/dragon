import ExpireData from "./ExpireData"
import { store } from 'Redux/Store'
import { SET_QRTOKEN } from "Constants/ActionTypes"


class QrToken {
    private expireData: ExpireData<string>
    constructor() {
        this.expireData = new ExpireData<string>(null, 300)
    }

    setQrToken(data: string, dispatch = true) {
        if (dispatch) {
            store.dispatch({type: SET_QRTOKEN, data})
        }
        this.expireData.setData(data)
        return true;
    }

    getQrToken() {
        return this.expireData.getData()
    }

    refresh() {
        this.expireData.clearData()
    }
}

export const QrTokenObj = new QrToken();