<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Contracts\View\View;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use SocialiteProviders\Discord\Provider as DiscordProvider;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->config = [
            'redirect' => config('services.discord.redirect'),
            'client_id' => config('services.discord.client_id'),
            'client_secret' => config('services.discord.client_secret'),
        ];
    }

    /**
     * Pass over to the React SPA for authentication UI
     */
    public function index(): View
    {
        return view('welcome');
    }

    /**
     * Process an incoming login request
     */
    public function authenticate()
    {
        $url = Socialite::buildProvider(
            DiscordProvider::class,
            $this->config
        )->redirect()->getTargetUrl();

        return $url;
    }

    /**
     * Process data returned from ext. OAuth API
     */
    public function callback()
    {
        $user = Socialite::driver('discord')->user();

        dd($user);
    }
}
