/**
 * 🔐 Authentication System
 * Simple client-side login state manager using localStorage
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'gf_day_auth_role';

  window.AuthSystem = {
    /** Store the logged-in role */
    login: function (role) {
      localStorage.setItem(STORAGE_KEY, role);
    },

    /** Get current role: 'admin' | 'viewer' | null */
    getRole: function () {
      return localStorage.getItem(STORAGE_KEY);
    },

    /** Check if current user is admin (can edit photos) */
    isAdmin: function () {
      return this.getRole() === 'admin';
    },

    /** Check if any user is logged in */
    isLoggedIn: function () {
      var role = this.getRole();
      return role === 'admin' || role === 'viewer';
    },

    /** Clear login state */
    logout: function () {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
})();
