Rails.application.routes.draw do
  root to: "home#index"
  get 'home/index'

  namespace :api, {format: 'json'} do
    namespace :v1 do
      resources :tasks
      resources :strict_tasks

      resources :users, only: [:create]
      resource :auths, only: [:create]

      post 'register' => 'users#create'
      post 'login' => 'auths#create'
    end
  end

  post "oauth/callback" => "oauths#callback"
  get 'oauth/callback' => 'oauths#callback'
  get 'oauth/:provider' => 'oauths#oauth', as: :auth_at_provider


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
