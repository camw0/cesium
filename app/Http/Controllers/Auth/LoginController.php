<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Contracts\Hashing\Hasher;
use SocialiteProviders\Discord\Provider as DiscordProvider;

class LoginController extends Controller
{
    public function __construct(private Hasher $hasher)
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
    public function callback(Request $request): RedirectResponse
    {
        $user = null;
        $discord = Socialite::driver('discord')->user();

        if (User::where('email', $discord->email)->exists()) {
            $user = User::where('email', $discord->email)->first();
        } else {
            $user = User::create([
                'email' => $discord->email,
                'name' => $discord->name,
                'discord_id' => $discord->id,
                'avatar' => $discord->avatar,
                'password' => $this->hasher->make(Str::random(64)),
            ]);
        };

        if ($user instanceof User) {
            Auth::login($user, true);
        } else {
            throw new Exception('authentication flow failed: not instanceof user');
        };

        return redirect()->route('web.index');
    }
}
