<template>
  <b-breadcrumb>
    <b-breadcrumb-item to="/">
      <b-icon
        icon="house-fill"
        scale="1.25"
        shift-v="1.25"
        aria-hidden="true"
      ></b-icon>
      Home
    </b-breadcrumb-item>
    <b-breadcrumb-item to="/about"> About </b-breadcrumb-item>
    <b-breadcrumb-item to="/create"> Create </b-breadcrumb-item>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-breadcrumb-item to="/login"> Login </b-breadcrumb-item>
      </b-nav-form>
    </b-navbar-nav>
  </b-breadcrumb>
</template>