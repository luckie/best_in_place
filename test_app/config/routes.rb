BipApp::Application.routes.draw do
  resources :users do
    member do
      put :test_respond_with
    end
  end

  root :to => "users#index"
end
