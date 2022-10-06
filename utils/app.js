
import { toast } from "react-toastify";
import productApi from "../api/productApi";
export const showInfo = message => {
    toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000
    });
};

export const showSuccess = message => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000
    });
};
export const showError = message => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000
    });
};
export const onShare = (route, id, feature_Id) => {
    const url = `https://nailsbeautysupply.com/${route}`
    window.FB.ui(
        {
            display: "dialog",
            method: "share",
            href: url,
        },
        (response) => {
            if (response) {
                shareComplete()
            } else {
                // shareError()
            }
        }
    );
}
const shareComplete = (id,feature_Id) => {
    productApi.shareSuccess(id, feature_Id).then(res => {
        if (res) {
            showSuccess('share success');
        }
    })
}
const shareError = (id,feature_Id) => {
    productApi.shareError(id, feature_Id).then(res => {
        alert('error');
    })
}