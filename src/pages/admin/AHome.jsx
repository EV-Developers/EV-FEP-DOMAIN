import React from 'react'
import { check_auth } from '../../config/check_auth';

export default function AHome() {
  check_auth('admin');

  return (
    <div>AHome</div>
  )
}
