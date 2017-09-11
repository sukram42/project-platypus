/**
 * Created by boebel on 08.09.2017.
 */

import React, {Component} from 'react';

import Table from 'grommet/components/Table';

export default class DatabaseBuildInfoComponent extends Component {


  constructor() {
    super();

    this.state = {};
  }

  render() {
    let values = this.props.value;
    let git,
      version,
      engine,
      bits,
      debug,
      openSSLrun,
      openSSLcomp,
      environment;

    console.log("Val in build", this.props.value);
    if (values) {
      git = values.gitVersion;
      version = values.version;
      engine = values.javascriptEngine;
      bits = values.bits;
      debug = values.debug;
      if (values.openssl) {
        openSSLrun = values.openssl.running;
        openSSLcomp = values.openssl.compiled;
      }
      environment = values.buildEnvironment;
    }
    return (
      <Table scrollable={false}>
        <tbody>
        <tr>
          <td>
            Version
          </td>
          <td>
            {version}
          </td>
        </tr>

        <tr>
          <td>
            Git Version
          </td>
          <td>
            {git}
          </td>
        </tr>
        <tr>
          <td>
            Javascript Engine
          </td>
          <td>
            {engine}
          </td>
        </tr>
        <tr>
          <td>
            Target Processor Bits
          </td>
          <td>
            {bits}
          </td>
        </tr>
        <tr>
          <td>
            Debug-mode
          </td>
          <td>
            {debug ? "yes" : "no"}
          </td>
        </tr>
        <tr>
          <td>
            Open SSL
          </td>
          <td>
            {openSSLcomp ? "compiled - " + openSSLcomp + " | running  - " + openSSLrun : ""}

          </td>
        </tr>
        </tbody>
      </ Table >
    );
  }
}