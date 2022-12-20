// import { Component } from 'react'
// import { Link, Navigate } from 'react-router-dom'

// class ErrorBoundary extends Component {

//   state = { hasError: false, redirect: false }

//   static getDerivedStateFromError = () => {
//     return { hasError: true }
//   }

//   componentDidCatch(error, info) {
//     console.error("ErrorBoundary caught an error", error, info)    //here is the space fro error API. For example: century
//   }

//   componentDidUpdate() {
//     if (this.state.hasError)
//       setTimeout(() => this.setState({ redirect: true }), 5000)
//   }

//   render() {
//     if (this.state.redirect) {
//       return <Navigate to='/' />
//     } else if (this.state.hasError) {
//       return (
//         <h2>Sorry, there was an error. <Link to='/'>Click here</Link> to get back to the homepage.</h2>
//       )
//     }

//     return this.props.children
//   }
// }

// export default ErrorBoundary;

// mostly code from reactjs.org/docs/error-boundaries.html
import { Component, ErrorInfo } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
