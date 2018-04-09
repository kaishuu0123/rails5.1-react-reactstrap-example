class Api::V1::AuthsController < Api::Base::ApplicationController
  def create
    if (user = User.authenticate(params[:email], params[:password]))
      tokens = Jwt::TokenProvider.refresh_tokens user

      render json: { status: :success, data: tokens }
    else
      unauthorized
    end
  end
end
