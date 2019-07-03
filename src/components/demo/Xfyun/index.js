import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import qs from 'query-string';
import { Toast } from 'antd-mobile';
import Recorder from 'js-audio-recorder';
import './index.less';

const text = '八百标兵奔北坡，北坡炮兵并排跑，炮兵怕把标兵碰，标兵怕碰炮兵炮。';
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

  useEffect(() => {
    recorder.onprocess = value => {
      setDuration(value);
    };
  }, []);

  const xfyun = audio => {
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
        setScore(totalScore);
        Toast.info(`您本次测试总分为 ${formatNumber(totalScore)}`);
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
    if (status === AUDIO_STATUS_STOP) {
      setStatus(AUDIO_STATUS_START);
      setScore(0);
      recorder.start();
    }
    if (status === AUDIO_STATUS_START) {
      setStatus(AUDIO_STATUS_STOP);
      recorder.stop();
      convertBlob2Base64(recorder.getPCMBlob()).then(audio => xfyun(audio));
    }
  };

  return (
    <div className="xfyun">
      <div className="xfyun-header">普通话特级评测</div>
      <div className="xfyun-topic">{text}</div>
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
