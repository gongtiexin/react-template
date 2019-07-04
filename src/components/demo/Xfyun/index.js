import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import qs from 'query-string';
import { Toast, TextareaItem } from 'antd-mobile';
import Recorder from 'js-audio-recorder';
import shortid from 'shortid';
import './index.less';
import pyUutils from 'pinyin-utils';

// const DEFALUT_TEXT = '八百标兵奔北坡，北坡炮兵并排跑，炮兵怕把标兵碰，标兵怕碰炮兵炮。';
const DEFALUT_TEXT = '中少红卡';
const api = '/v1/service/v1/ise';
const XAppid = '5d1b3fc1';
const Apikey = '1445841985022e19ba89175590b2e8c2';
const XParam = btoa(
  JSON.stringify({
    aue: 'raw',
    result_level: 'entirety',
    language: 'zh_cn',
    category: 'read_sentence',
  }),
);

const recorder = new Recorder({
  sampleBits: 16, // 采样位数，范围8或16
  sampleRate: 16000, // 采样率，范围11025、16000、22050、24000、44100、48000
  numChannels: 1, // 声道，范围1或2
});

const AUDIO_STATUS_STOP = 'stop';
const AUDIO_STATUS_START = 'start';

const formatNumber = number => Math.round(number * 100) / 100;

const Xfyun = props => {
  const [status, setStatus] = useState(AUDIO_STATUS_STOP);
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(0);
  const [text, setText] = useState(DEFALUT_TEXT);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    recorder.onprocess = value => {
      setDuration(value);
    };
  }, []);

  const xfyun = audio => {
    Toast.loading('正在为您打分', 0);

    const XCurTime = Math.round(new Date().valueOf() / 1000);
    const XCheckSum = md5(Apikey + XCurTime + XParam);

    axios
      .post(
        api,
        qs.stringify({
          audio,
          text,
        }),
        {
          headers: {
            'X-Appid': XAppid,
            'X-CurTime': XCurTime,
            'X-Param': XParam,
            'X-CheckSum': XCheckSum,
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
        },
      )
      .then(res => {
        const totalScore = res.data.data.read_sentence.rec_paper.read_sentence.total_score;
        const { word } = res.data.data.read_sentence.rec_paper.read_sentence.sentence;
        setScore(totalScore);
        setWordList(word);
        Toast.hide();
        Toast.success(`您本次得分为 ${formatNumber(totalScore)}`);
      });
  };

  const convertBlob2Base64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data.substr(base64data.indexOf(',') + 1));
      };
    });
  };

  const handleClick = () => {
    if (!text) {
      Toast.fail('请输入要测试的中文');
    } else {
      if (status === AUDIO_STATUS_STOP) {
        setStatus(AUDIO_STATUS_START);
        setScore(0);
        setWordList([]);
        recorder.start();
      }
      if (status === AUDIO_STATUS_START) {
        setStatus(AUDIO_STATUS_STOP);
        recorder.stop();
        convertBlob2Base64(recorder.getPCMBlob()).then(audio => xfyun(audio));
      }
    }
  };

  const isError = word => {
    let { syll } = word;
    if (!Array.isArray(syll)) {
      syll = [syll];
    }
    return syll.some(item => item.dp_message !== '0');
  };

  return (
    <div className="xfyun">
      <div className="xfyun-header">普通话评测</div>
      <TextareaItem value={text} rows={5} onChange={setText} count={180} />
      {wordList.length !== 0 && (
        <div className="xfyun-header-word-list">
          {text.split('').map((item, idx) => (
            <div
              className={`${
                isError(wordList[idx]) ? 'xfyun-header-word-list-item-error' : ''
              } xfyun-header-word-list-item`}
              key={shortid.generate()}
            >
              <span className="xfyun-header-word-list-item-pinyin">{pyUutils.numberToMark(wordList[idx].symbol)}</span>
              <span className="xfyun-header-word-list-item-word">{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className="audio-box">
        <div className="container">
          <input onClick={handleClick} type="checkbox" id="btn" />
          <label htmlFor="btn" />
          <div className="time">{formatNumber(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default Xfyun;
