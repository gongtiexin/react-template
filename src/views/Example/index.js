import React, { useState, useEffect } from 'react';
import { useStores } from '@src/stores';
import { observer } from 'mobx-react';
import { query } from '@src/services/example';
import './index.less';

const Example = () => {
    const [stateMsg, setStateMsg] = useState('');
    const exampleStore = useStores('example');

    useEffect(() => {
        query({ msg: 'hello' }).then(({ msg }) => {
            exampleStore.setMsg(`mobx ${msg}`);
            setStateMsg(`state ${msg}`);
        });
    }, []);

    return (
        <div className="normal">
            <h1 className="title">hello, react</h1>
            <h2>{exampleStore.msg}</h2>
            <h2>{stateMsg}</h2>
            <div className="welcome" />
        </div>
    );
};

export default React.memo(observer(Example));
