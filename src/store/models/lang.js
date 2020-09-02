import { LANGE_ENUM } from '@src/constants/lang';

export default {
    state: LANGE_ENUM.ZH,
    reducers: {
        setLang(state, payload) {
            return payload;
        }
    }
};
