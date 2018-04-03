Rails.application.routes.draw do
  root to: "home#index"
  get 'home/index'

  namespace :api, {format: 'json'} do
    namespace :v1 do
      resources :tasks
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
