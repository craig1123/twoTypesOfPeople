import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {
    state = { mounted: false, expand: false }

    componentDidMount() {
      setTimeout(() => { this.mount(); }, 0);
    }

    mount = () => {
      this.setState({ mounted: true });
      setTimeout(() => { this.expand(); }, 1000);
    }
    expand = () => {
      this.setState({ expand: true });
      setTimeout(() => { this.props.endLoading(); }, 1000);
    }

    render() {
      const { mounted, expand } = this.state;
      return (
        <div
          className="loading-bar"
          style={{
            width: mounted && '100%',
            height: expand && '100%',
            top: expand && 0,
            borderRadius: expand && 0,
          }}
        />
      );
    }
}
