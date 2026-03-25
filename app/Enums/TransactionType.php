<?php

namespace App\Enums;

enum TransactionType: string
{
    case REWARD = 'reward';
    case VIOLATION = 'violation';
    case RESET = 'reset';
    case REVOKED = 'revoked';
}
