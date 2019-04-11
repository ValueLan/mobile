import net from '@/net'
import utils from '@/utils';
const API = process.env.REACT_APP_API;


export default {
	logout: () => {
		return net.GET(`${API}/user/signout`);
	},
	getCaptcha: () => {
		return net.GET(`${API}/captcha`);
	},
	getUser: () => {
		return net.GET(`${API}/user/profile`);
	}
}