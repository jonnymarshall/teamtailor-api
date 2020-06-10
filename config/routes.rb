Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'jobs#index'

  resources :jobs, only: [:index]
  resources :favourites, only: [:index, :create, :destroy]
end
