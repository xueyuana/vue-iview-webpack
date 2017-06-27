<template>
  <div class="notice">
    <div class="wrap">
      <h3>内核‘Dirty Cow’提权漏洞安全预警公告</h3>

      <p class="honorific">尊敬的用户:<br/></p>

      <p>Linux 内核近日爆发的’Dirty Cow’漏洞（CVE-2016-5195），可以导致低权限用户实现本地提权,危害极大。请检查您使用内核是否在影响范围之内，并及时升级。</p>

      <h4>漏洞影响范围</h4>

      <p>Linux Kernel &gt;= 2.6.22 的所有 Linux 系统<br/>意味着从 2007 年发布 2.6.22 版本开始，直到2016年10月18日为止，这中间发行的所有 Linux 系统都可能受影响。使用uname -a查看 Linux 系统的内核版本，如3.13.0-32-generic，上述内核版本3.13.0-32-generic可能受漏洞影响。</p>

      <h4>漏洞修复方案</h4>

      <p>因为涉及到操作系统内核的升级，我们强烈建议您：正确关闭正在运行的服务，并做好数据备份工作。同时创建服务器磁盘备份，避免修复失败造成不可逆的影响。</p>

      <h4>Ubuntu系统</h4>

      <p>Ubuntu 系统必须在/etc/apt/sources.list中开启–security后缀的源地址才能收到更新。由于各镜像更新软件包存在一定的延迟（一般为数小时），为了及时得到更新，建议从官方源获取安全更新，地址如下：</p>

      <ul><li>Ubuntu 12.04 LTS
  deb http://security.ubuntu.com/ubuntu/precise-security main</li><li>Ubuntu 14.04 LTS
  deb http://security.ubuntu.com/ubuntu/trusty-security main</li><li>Ubuntu 16.04 LTS
  deb http://security.ubuntu.com/ubuntu xenial-security main</li></ul>

      <h4>更新包列表：</h4>

      <ul><li>sudo apt-get update</li><li>升级软件包（请提前做好数据备份工作！）：</li><li>sudo apt-get upgrade</li></ul>

      <h4>重启系统</h4>
    </div>
  </div>
</template>

<style lang="less" scoped>

  .notice {
    box-sizing: border-box;
    height: 100%;
    padding: 100px 0;

    h3 {
      font-size: 18px;
      text-align: center;
      line-height: 50px;
    }

    h4 {
      font-size: 16px;
      line-height: 50px;
    }

    ul {
      list-style: disc inside;
      margin-left: 20px;
    }

    p {
      text-indent: 2em;
    }

    .honorific {
      text-indent: 0;
    }
  }

  .wrap {
    box-sizing: border-box;
    height: 100%;
    margin: 30px 200px;
    padding: 10px 30px;
    background-color: #fff;
    font-size: 14px;
    overflow: auto;
  }


</style>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>