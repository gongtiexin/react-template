import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import messages_zh from '@src/locales/zh_CN.json';
import messages_en from '@src/locales/en_US.json';
import { LANGE_ENUM } from '@src/constants/lang';

const messages = {
    [LANGE_ENUM.ZH]: messages_zh,
    [LANGE_ENUM.EN]: messages_en
};

const mapState = (state) => {
    return {
        lang: state.lang
    };
};

const MyIntlProvider = (props) => {
    return (
        <IntlProvider messages={messages[props.lang]} locale={props.lang}>
            {props.children}
        </IntlProvider>
    );
};

export default React.memo(connect(mapState)(MyIntlProvider));
