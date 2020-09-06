import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Dashboard = ({ auth }) => {
  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      {auth.loading && <Spinner />}
      <p className='lead'>
        {!auth.loading && (
          <>
            <i className='fas fa-user'></i> Bienvenido{' '}
            {auth.user && auth.user.name}
          </>
        )}
      </p>
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
