import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  onSubmit(e) {
    e.preventDefault()

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        // after the mutation, we need to refetch to get the latest data
        // we can't use the this.props.data.refetch() method since that query
        // isn't directly associated with this component
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
