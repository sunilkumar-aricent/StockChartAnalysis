import React, {Fragment} from 'react';
import {AsyncTypeahead, GithubMenuItem} from 'react-bootstrap-typeahead';

class Typeahead extends React.Component {
    state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
    };

    selectCompany = (item) => {
        console.log(item);
        this.setState({ options:[] });
        this.props.selectCompany(item);
    }
  
    render() {
      return (
        <Fragment>
          <AsyncTypeahead
            {...this.state}
            id="search-typeahead"
            labelKey="name"
            minLength={3}
            onSearch={this._handleSearch}
            placeholder="Search for a company..."
            onChange={this.props.selectCompany}
            // renderMenuItemChildren={(option, props) => {
            //     return (
            //         <GithubMenuItem key={option.id} user={option.name} />
            //     )
            // }}
            // renderMenuItemChildren={(options, props) => {
            //     return options.map((item) => {
            //         return <li key={item.id}>{item.name}</li>
            //     })
            //   }
            // }
          />
          {/* <FormGroup>
            {this._renderCheckboxes()}
          </FormGroup> */}
          <div style={{ position: 'absolute', width: '100%' }}>
              <ul>
                  {
                    this.state.options.map((item) => {
                        return <li className="search-result-option" key={item.id} onClick={() => this.selectCompany(item)}>{item.name}</li>
                    })
                  }
              </ul>
          </div>
        </Fragment>
      );
    }
  
    // _renderCheckboxes() {
    //   const checkboxes = [
    //     {label: 'Multi-Select', name: 'multiple'},
    //     {label: 'Allow custom selections', name: 'allowNew'},
    //   ];
  
    //   return checkboxes.map(({label, name}) => (
    //     <Control
    //       checked={this.state[name]}
    //       key={name}
    //       name={name}
    //       onChange={this._handleChange}
    //       type="checkbox">
    //       {label}
    //     </Control>
    //   ));
    // }
  
    // _handleChange = (e) => {
    //   const {checked, name} = e.target;
    //   this.setState({[name]: checked});
    // }
  
    _handleSearch = (query) => {
      this.setState({isLoading: true});
        //   makeAndHandleRequest(query)
      this.props.searchCompany(query, (options) => {
          console.log(options);
        this.setState({
            isLoading: false,
            options,
        });
      });
    }
  }

  export default Typeahead;