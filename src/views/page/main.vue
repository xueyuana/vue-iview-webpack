<template>
  <div id="sectionContent" class="fp-section-content">
    <div class="fp-section page1"></div>
    <div class="fp-section">
      <div class="box item1">
        <div class="img">
          <img src="./image/news.jpg" alt="">
        </div>
        <div class="content">
          <div class="title">最新公告</div>
          <ul>
            <li><router-link :to="{name: 'notice'}">内核‘Dirty Cow’提权漏洞安全预警公告</router-link><span>2017.6.23</span></li>
            <li><a>内核‘Dirty Cow’提权漏洞安全预警公告阿萨德风口</a><span>2017.6.23</span></li>
            <li><a>内核‘Dirty Cow’提权漏洞安全预警公告</a><span>2017.6.23</span></li>
            <li><a>内核‘Dirty Cow’提权漏洞安全预警公告2</a><span>2017.6.23</span></li>
            <li><a>内核‘Dirty Cow’提权漏洞安</a><span>2017.6.23</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fp-section">
      <div class="box item2">
        <div class="header2">
          <span class="title">云服务器</span>
        </div>
        <div class="box2">
          <div class="row">
            <div class="row_item">
              <div class="item-title">弹性</div>
              <div class="item-right">
                <div class="sub-title">弹性计算</div>
                <div class="content">
                  在云上您可以在几分钟之内快速增加或删减云服务器数量，以满足您快速变化的业务需求；

                </div>
              </div>
            </div>
            <div class="row_item">
              <div class="item-title">简单</div>
              <div class="item-right">
                <div class="sub-title">简单易用</div>
                <div class="content">
                  您可以使用云控制台或CLI来完全控制您的服务器实例，随时查看和配置您的资源。

                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="row_item">
              <div class="item-title">灵活</div>
              <div class="item-right">
                <div class="sub-title">灵活配置</div>
                <div class="content">
                  我们提供多种实例类型，操作系统和软件包供您选择。

                </div>
              </div>
            </div>
            <div class="row_item">
              <div class="item-title">控制</div>
              <div class="item-right">
                <div class="sub-title">完全控制权</div>
                <div class="content">
                  拥有操作系统的完全控制权，可通过连接管理终端，自行解决系统问题。

                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="row_item">
              <div class="item-title">稳定</div>
              <div class="item-right">
                <div class="sub-title">稳定可靠</div>
                <div class="content">
                  提供99.95%的服务可用性；
                  搭载稳定的网络架构，采用成熟的网络虚拟化技术和网卡绑定技术；

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="fp-section">
      <div class="box item3">
        <div class="title">帮助与支持</div>
        <m-Tabs :tabs="['文档中心','安全建议','文档下载']">
          <div slot="item0">
            <div class="main_title">门头沟政务云文档中心</div>
            <div class="sub_title">欢迎阅读 政务云文档，我们尽可能以清晰简明的图文，介绍政务云的各项服务及使用方法。</div>
            <ul class="con_list">
              <li>
                <div class="circle"></div>
                如果您是新用户，建议通过阅读新手指南熟政务云的基础云服务。
              </li>
              <li>
                <div class="circle"></div>
                如果使用过程中遇到困惑或问题，建议先查看FAQ，我们会不断收集整理用户提出的问题，并更新至 FAQ 。
              </li>
              <li>
                <div class="circle"></div>
                根据工信部的规定，所有在大陆境内运行的网站必须进行 ICP 备案。
              </li>
            </ul>
            <a class="linkMe" href="">如果您有更多问题, 发送邮件反馈给我们。</a>
          </div>
          <div slot="item1">
            <div class="main_title">安全建议</div>
            <div class="sub_title">本帮助手册旨在指导系统管理人员或安全检查人员进行WINDOWS 操作系统的安全合规性检查和配置。</div>
            <div class="text">
              <h3>一.账户管理和认证授权</h3>

              <h4>1.账号</h4>

              <h5>1.1 默认账户安全</h5>

              <p>禁用“Guest”账户。
禁用或删除其他无用账户（可以先禁用账户3个月，确认没有问题后删除）。</p>

              <h5>1.2 按照用户分配帐户</h5>

              <p>按照用户分配帐户。根据业务要求，设定不同的帐户和帐户组，管理员用户，数据库用户，审计用户，来宾用户等。</p>

              <h5>1.3 定期检查并删除与无关帐户</h5>

              <p>删除或锁定与设备运行、维护等与工作无关的帐户</p>

              <h5>1.4 不显示最后的用户名</h5>

              <p>配置登录登出后，不显示用户名称。</p>

              <h4>2.口令</h4>

              <h5>2.1 密码复杂度</h5>

              <p>密码复杂度要求满足以下策略：
最短密码长度 8个字符，启用本机组策略中密码必须符合复杂性要求的策略。即密码至少包含以下四种类别的字符中的2种：</p>

              <ul>
                <li>英语大写字母 A, B, C, … Z</li>
                <li>英语小写字母 a, b, c, … z</li>
                <li>西方阿拉伯数字 0, 1, 2, … 9</li>
                <li>非字母数字字符，如标点符号，@, #, $, %, &amp;, *等</li>
              </ul>

              <h5>2.2 密码最长留存期</h5>

              <p>对于采用静态口令认证技术的设备，帐户口令的生存期不长于90天。</p>

              <h5>2.3 帐户锁定策略</h5>

              <p>对于采用静态口令认证技术的设备，应配置当用户连续认证失败次数超过10次，锁定该用户使用的帐户。</p>

              <h4>3.授权</h4>

              <h5>3.1远程关机</h5>

              <p>在本地安全设置中从远端系统强制关机只指派给Administrators组。</p>

              <h5>3.2 本地关机</h5>

              <p>在本地安全设置中关闭系统仅指派给Administrators组。</p>

              <h5>3.3 用户权限指派</h5>

              <p>在本地安全设置中取得文件或其它对象的所有权仅指派给Administrators</p>

              <h5>3.4 授权帐户登陆</h5>

              <p>在本地安全设置中配置指定授权用户允许本地登陆此计算机。</p>

              <h5>3.5 授权帐户从网络访问</h5>

              <p>在组策略中只允许授权帐号从网络访问(包括网络共享等，但不包括终端服务)此计算机。</p>

              <h3>二.日志配置操作</h3>

              <h4>4.日志配置</h4>

              <h5>4.1 审核登录</h5>

              <p>设备应配置日志功能，对用户登录进行记录，记录内容包括用户登录使用的帐户，登录是否成功，登录时间，以及远程登录时，用户使用的IP地址。</p>

              <h5>4.2 审核策略</h5>

              <p>启用组策略中对Windows系统的审核策略更改，成功和失败都要审核</p>

              <h5>4.3 审核对象访问</h5>

              <p>启用组策略中对Windows系统的审核对象访问，成功和失败都要审核。</p>

              <h5>4.4 审核事件目录服务访问</h5>

              <p>启用组策略中对Windows系统的审核目录服务访问，失败。</p>

              <h5>4.5 审核特权使用</h5>

              <p>启用组策略中对Windows系统的审核特权使用，成功和失败都要审核。</p>

              <h5>4.6 审核系统事件</h5>

              <p>启用组策略中对Windows系统的审核系统事件，成功和失败都要审核。</p>

              <h5>4.7 审核帐户管理</h5>

              <p>启用组策略中对Windows系统的审核帐户管理，成功和失败都要审核。</p>

              <h5>4.8 审核过程追踪</h5>

              <p>启用组策略中对Windows系统的审核过程追踪失败。</p>

              <h5>4.9 日志文件大小</h5>

              <p>设置应用日志文件大小至少为8192KB，可以根据磁盘空间配置日志文件大小，尽可能的记录的日志越多越好，设置当达到最大的日志尺寸时，按需要轮询记录日志。</p>

              <h3>五.IP协议安全配置</h3>

              <h4>5.IP协议安全</h4>

              <h5>5.1 启用SYN攻击保护</h5>

              <p>
                启用SYN攻击保护；指定触发SYN洪水攻击保护所必须超过的TCP连接请求数阀值为5；指定处于 SYN<em>RCVD 状态的 TCP 连接数的阈值为500；指定处于至少已发送一次重传的 SYN</em>RCVD 状态中的 TCP 连接数的阈值为400
                </p>

              <h3>六.文件权限</h3>

              <h4>6 共享文件夹及访问权限</h4>

              <h5>6.1关闭默认共享</h5>

              <p>非域环境中，关闭Windows硬盘默认共享，例如C$，D$。</p>

              <h5>6.2 共享文件夹授权访问</h5>

              <p>每个共享文件夹的共享权限，只允许授权的帐户拥有权限共享此文件夹。</p>

              <h3>七.服务安全</h3>

              <h5>7.1禁用TCP/IP上的NetBIOS</h5>

              <p>禁用TCP/IP上的NetBIOS协议，可以关闭监听的UDP 137（netbios-ns）、UDP 138（netbios-dgm）以及TCP 139（netbios-ssn）端口。</p>

              <h3>八.安全选项</h3>

              <h5>8.1 启用安全选项</h5>

              <h5>8.2 禁用未登录前关机</h5>

              <p>服务器默认是禁止显示在开机未进入系统前的，如果启用此设置，那么服务器安全性就大大降低，给与远程连接的黑客造成可乘之机，强烈建议禁用未登录前关机功能。</p>

              <h3>九.其他安全配置</h3>

              <h5>9.1 防病毒管理</h5>

              <p>Windows系统需要安装防病毒软件。</p>

              <h5>9.2 设置屏幕保护密码和开启时间</h5>

              <p>设置带密码的屏幕保护，并将时间设定为5分钟。</p>

              <h5>9.3 操作系统补丁管理</h5>

              <p>安装最新的Hotfix补丁。对服务器系统应先进行兼容性测试。</p>
            </div>

          </div>
          <div slot="item2">
            <table>
              <thead>
              <tr>
                <th>序号</th>
                <th>标题</th>
                <th>发起人</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list" :class="{bac: index%2 != 0}">
                <td>{{index + 1}}</td>
                <td><a style="color: #3399ff" href="image/main2.jpg" download="file">{{item.title}}</a></td>
                <td>{{item.announcer}}</td>
                <td>{{item.time}}</td>
              </tr>
              </tbody>

            </table>
          </div>
        </m-Tabs>
      </div>
    </div>
    <div class="fp-section">
      <div class="box item4">
        <div class="header">
          <span class="title">关于我们</span>
        </div>
        <div class="content">
          <p>
            门头沟区是北京市下辖的市辖区，地处北京西部山区，是具有悠久历史文化和优良革命传统的老区。早在一万年以前，新石器时代早期的“东胡林人”就在此繁衍生息。燕昭王二十九年（公元前283年）设上谷、渔阳、右北平、辽西、辽东五郡，今区境分属上谷、渔阳二郡。此后，区境的隶属行政建制屡经变迁，直到1958年5月定名为门头沟区至今。</p>

          <p>
            门头沟区政府门户网站设有区机关各委、办、局和各区县政府分站点。分站点由区委政府统一组织建设，统一管理，并在发展中不断丰富和完善。通过这些分站点，可以进一步了解区政府机关各职能部门提供的特色信息和专业的公众服务信息，并实现网上办事。</p>

          <p>门头沟区政府门户网站有高水准的政民互动平台。互动是网络的优势，政府和市民可以通过网络平台进行互动，彻底改变了传统单方面传达的沟通方式，有效实现政府为民办事、问计于民。</p>

          <p>门头沟区政府门户网站有强大的多媒体资源，以文字、图片、动画、视频等多样形式展示门头沟的权威资讯、特色资源，超越了传统媒体单一的表现形式，极大地提高了宣传效果。</p>

          <p> 门头沟区政府门户网站真诚地希望能以丰富的信息服务于民，成为宣传门头沟的窗口、展示门头沟风采的舞台、为门头沟的经济发展和文化交流作出积极贡献。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @headH: 100px;

  .page {
    width: 100%;
    height: 100%;
    font-size: 18px;
    background: #F8F8F9;
    position: relative;
    color: #303030;
    a {
      color: #303030;
    }

    .item {
      position: absolute;
      height: @headH;
      width: 100%;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 200;
      transition: 1.2s;

      &.head {
        top: 0;
        background-color: #fff;

        .logo {
          width: 87px;
          height: 70px;
          background: url("image/logo2.png") no-repeat 0 0;
          background-size: contain;
        }
        .nav {
          li {
            display: inline-block;
            height: 35px;
            margin: 0 20px;
            cursor: pointer;
            border-bottom: 4px solid transparent;
            transition: border-bottom-color 0.8s;
          }
          .itemActive {
            border-bottom-color: #00923F;
          }
        }
        .button {
          width: 110px;
          height: 40px;
          background-color: #fff;
          border-radius: 20px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          color: #303030;
        }
      }

      &.foot {
        bottom: 0;
        .copyright {
          font-family: SourceSansPro-Bold;
          font-size: 12px;
          color: #303030;
          letter-spacing: 0.52px;
          line-height: 22px;
        }
        .arrow {
          margin: 0 auto;
          width: 20px;
          height: 10px;
          background: url("image/arrow_black.png") no-repeat 0 0;
          background-size: contain;
          animation: arrow 1s linear infinite;
        }
        .top {
          width: 50px;
          height: 50px;
          margin-left: 50px;
          background: url("image/top.png") no-repeat 0 0;
        }
      }
    }

    &.active {
      .item {
        color: #fff;
        background-color: transparent;
        .logo {
          background-image: url("image/logo.png");
        }
        .arrow {
          background-image: url("image/arrow_white.png");
        }
        .copyright {
          color: #fff;
        }
      }
    }

    .content {
      height: 100%;
      overflow: hidden;
      .fp-section {
        padding: @headH 0;
        display: flex;
        justify-content: center;
        .box {
          width: 70%;
          padding-top: 40px;
          .title {
            font-family: PingFangSC-Light;
            font-size: 40px;
            color: #00923F;
            line-height: 80px;
          }
        }

        .item1 {
          display: flex;
          max-height: 500px;
          .img {
            width: 402px;
            height: 490px;
            vertical-align: bottom;
          }
          .content {
            flex: 1;
            padding: 0 0 40px 50px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            ul {
              width: 100%;
              li {
                width: 100%;
                display: flex;
                a {
                  flex: 1;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  color: #3399ff;
                }

                span {
                  width: 92px;
                  margin-left: 20px;
                  color: #C3C3C3;
                }
              }
            }

          }
        }

        .item2 {
          .header2 {
            text-align: center;
          }
          .title {
            font-size: 40px;
            color: #00923F;
            font-family: PingFangSC-Light;
            line-height: 45px;
          }
          .box2 {
            width: 80%;
            height: 200px;
            margin: 60px auto;
          }
          .row {
            width: 100%;
            display: flex;
          }
          .row_item {
            width: 50%;
            height: 136px;
            display: flex;
            box-sizing: border-box;
            padding-right: 50px;
          }

          .item-title {
            width: 20%;
            color: #303030;
            font-size: 30px;
            font-family: PingFangSC-Light;
            box-sizing: border-box;
          }
          .item-right {
            width: 80%;
          }

          .sub-title {
            font-size: 20px;
            color: #303030;
            font-family: PingFangSC-Regular;
            letter-spacing: 4px;
          }
          .content {
            font-size: 18px;
            opacity: 0.8;
            color: #303030;
            font-family: PingFangSC-Regular;
          }
        }

        .item3 {
          .main_title {
            font-size: 22px;
            letter-spacing: 4px;
          }
          .sub_title {
            opacity: 0.8;
            line-height: 27px;
          }
          .con_list {
            margin-top: 40px;
            li {
              .circle {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 15px;
                background-color: #00923F;
                border-radius: 50%;
              }
            }
          }

          .linkMe {
            display: block;
            margin-top: 25px;
            font-size: 16px;
            color: #00923F;
            text-decoration: underline;
          }

          .text {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #303030;
            line-height: 20px;
            h3 {
              font-size: 18px;
              line-height: 30px;
            }
            h4 {
              font-size: 16px;
              line-height: 22px;
            }
            h5 {
              font-size: 14px;
              line-height: 22px;
            }
            p {
              text-indent: 2em;
            }
          }
        }

        .item4 {
          .header {
            text-align: center;
            line-height: 45px;
          }
          .title {
            font-size: 40px;
            color: #00923F;
            font-family: PingFangSC-Light;
          }
          .content {
            width: 80%;
            margin: 60px auto;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #303030;
            line-height: 20px;
            opacity: 0.8;
          }
          p {
            margin-bottom: 30px;
          }
        }

        &.page1 {
          background: url("image/main.jpg") no-repeat 0 0;
          background-size: cover;
        }
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #657180;
  }
  table td,th{
    text-align: center;
  }
  table tr {
    height: 40px;
  }
  table thead tr{
    background-color: #ebf4fe;
  }
  table tbody tr:hover {
    background-color: #F3FAFF;
  }
  .bac {
    background-color: #fcfcfc;
  }

  @keyframes arrow {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(15px);
    }
  }

</style>

<script>
  import Tabs from '../../components/common/tabs.vue'

  export default {
    data() {
      return {
        list: [
          {
            title: '内核‘Dirty Cow’提权漏洞安全预警公告',
            announcer: '管理员',
            time: '2017.6.23'
          }
        ]
      }
    },
    computed: {

    },
    mounted() {
      let _self = this
      this.$fullpage.init('#sectionContent', {
        beforeLeave: function (leaveIndex, nowIndex) {
          _self.$emit('changactive', nowIndex)
        }
      })
    },
    methods: {

    },
    components: {
      mTabs: Tabs
    }
  }
</script>