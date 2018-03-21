import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Table,
  Text,
  ExpandedDataRow,
  ErrorWrapper
} from '@bpanel/bpanel-ui';
import { pick } from 'underscore';

import { peers as peerSelectors } from '../selectors';

class PeersList extends PureComponent {
  constructor(props) {
    super(props);
  }

  static get displayName() {
    return 'Peers List';
  }

  static get propTypes() {
    return {
      peers: PropTypes.arrayOf(PropTypes.object)
    };
  }

  render() {
    const { peers } = this.props;
    let table;
    if (Array.isArray(peers) && peers.length) {
      const data = peerSelectors.peerTableData(peers);
      const expandedData = data.map(peer => ({
        mainData: pick(peer, ['addr', 'name', 'subver'])
      }));
      table = (
        <Table
          tableData={data}
          expandedData={expandedData}
          ExpandedComponent={ExpandedDataRow}
          expandedHeight={200}
        />
      );
    } else {
      table = <Text type="p">Loading peers...</Text>;
    }

    return (
      <div className="col-lg-8">
        <Header type="h3">Peers List</Header>
        <div className="peers-list">{table}</div>
      </div>
    );
  }
}

export default ErrorWrapper(PeersList);
