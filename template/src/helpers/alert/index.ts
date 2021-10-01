import { Alert, AlertButton, AlertOptions } from "react-native"

// Define Type
export type SuccessAlertType = {
  title: string,
  message: string,
  onConfirm: () => void
};


export const showSuccessAlert = (alertSuccess: SuccessAlertType) => {
  
  const confirmButton: AlertButton = {
    text: 'OK',
    onPress: alertSuccess.onConfirm
  }

  const options: AlertOptions = {
    onDismiss: alertSuccess.onConfirm
  }

  Alert.alert(alertSuccess.title, alertSuccess.message, [confirmButton], options)
}

// Define Type
export type ConfirmAlertType = {
  title: string,
  message: string,
  titleCancel: string,
  titleOk: string,
  onPressOk: () => void,
  onPressCancel?: () => void
};

export const showConfirmAlert = (alertSuccess: ConfirmAlertType) => {
  
  const confirmButtonOk: AlertButton = {
    text: alertSuccess.titleOk,
    onPress: alertSuccess.onPressOk
  }

  const confirmButtonCancel: AlertButton = {
    text: alertSuccess.titleCancel,
    onPress: alertSuccess.onPressCancel,
    style: 'cancel',
  }

  const options: AlertOptions = {
    onDismiss: alertSuccess.onPressCancel
  }

  Alert.alert(alertSuccess.title, alertSuccess.message, [confirmButtonOk, confirmButtonCancel], options)
}