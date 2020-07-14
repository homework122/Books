import React from 'react'
import MemberLevel from './MemberLevel'
import MemberList from './MemberList'
import MemberScores from './MemberScores'
class MemberMange extends React.Component {
  render() {
    return (
        <div>
            会员管理
            <MemberLevel></MemberLevel>
            <MemberList></MemberList>
            <MemberScores></MemberScores>
        </div>
    )
  }
}

export {MemberMange as default}