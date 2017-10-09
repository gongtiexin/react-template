const isProduction = process.env.NODE_ENV === 'production';

const hostChartOptions = [[{
  id: 'cpu',
  type: 'BAR',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  legend: {
    data: [],
  },
  xAxis:
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  yAxis: {
    type: 'value',
    splitNumber: 2,
    max: 100,
    axisLabel: {
      formatter: '{value}%',
    },
  },
  series: [],

}, {
  id: 'memory',
  type: 'LINE',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: 'left',
    data: [],
  },
  xAxis: {
    data: [],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    max: 'dataMax',
    splitNumber: 4,
    axisLabel: {
      formatter: '{value} GB',
    },
  },
  series: [],
}],
[{
  id: 'disk',
  type: 'LINE',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    left: 'left',
    data: [],
  },
  xAxis: {
    data: [],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: '{value} TB',
    },
  },
  series: [],
}, {
  id: 'network',
  type: 'LINE',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    left: 'left',
    data: [],
  },
  xAxis: {
    data: [],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: '{value} Kib/s',
    },
  },
  series: [],
}]];

const componentsMap = {
  ACTIVITY_ANALYZER: 'Activity Analyzer',
  ACTIVITY_EXPLORER: 'Activity Explorer',
  HBASE_MASTER: 'HBase Master',
  HST_SERVER: 'HST Server',
  INFRA_SOLR: 'Infra Solr Instance',
  KAFKA_BROKER: 'Kafka Broker',
  METRICS_GRAFANA: 'Grafana',
  NAMENODE: 'NameNode',
  SPARK2_JOBHISTORYSERVER: 'Spark2 History Server',
  ZOOKEEPER_SERVER: 'ZooKeeper Server',
  DATANODE: 'DataNode',
  HBASE_REGIONSERVER: 'RegionServer',
  HST_AGENT: 'HST Agent',
  METRICS_MONITOR: 'Metrics Monitor',
  NODEMANAGER: 'NodeManager',
  HBASE_CLIENT: 'HBase Client',
  HCAT: 'HCat Client',
  HDFS_CLIENT: 'HDFS Client',
  HIVE_CLIENT: 'Hive Client',
  INFRA_SOLR_CLIENT: 'Infra Solr Client',
  MAPREDUCE2_CLIENT: 'MapReduce2 Client',
  PIG: 'Pig Client',
  SLIDER: 'Slider Client',
  SPARK2_CLIENT: 'Spark2 Client',
  SQOOP: 'Sqoop Client',
  TEZ_CLIENT: 'Tez Client',
  YARN_CLIENT: 'YARN Client',
  ZOOKEEPER_CLIENT: 'ZooKeeper Client',
  APP_TIMELINE_SERVER: 'App Timeline Server',
  HISTORYSERVER: 'History Server',
  HIVE_METASTORE: 'Hive Metastore',
  HIVE_SERVER: 'HiveServer',
  RESOURCEMANAGER: 'ResourceManager',
  PHOENIX_QUERY_SERVER: 'Phoenix Query Server',
  SECONDARY_NAMENODE: 'SNameNode',
  WEBHCAT_SERVER: 'WebHCat Server',
  METRICS_COLLECTOR: 'Metrics Collector',
  ELASTICSEARCH_MASTER: 'Elasticsearch Master',
};

const operationStateMap = [{
  text: '所有',
  value: 'ALL',
}, {
  text: '待定',
  value: 'PENDING',
}, {
  text: '进行中',
  value: 'IN_PROGRESS',
}, {
  text: '失败',
  value: 'FAILED',
}, {
  text: '成功',
  value: 'COMPLETED',
}, {
  text: '中止',
  value: 'ABORTED',
}, {
  text: '超时',
  value: 'TIMEOUT',
}];

const alertStateMap = [{
  text: '所有',
  value: 'ALL',
}, {
  text: 'OK',
  value: 'OK',
}, {
  text: 'WARNING',
  value: 'WARNING',
}, {
  text: 'CRITICAL',
  value: 'CRITICAL',
}, {
  text: 'UNKNOWN',
  value: 'UNKNOWN',
}, {
  text: 'NONE',
  value: 'PENDING',
}];

export {
  isProduction, hostChartOptions, componentsMap, operationStateMap, alertStateMap,
};
