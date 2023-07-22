import { useToast } from 'vue-toast-notification'

class MiToast {
  toast = useToast()
  failed(message = 'failed') {
    this.toast.error(message)
  }
  success(message = 'success') {
    this.toast.success(message)
  }
}

export default MiToast
