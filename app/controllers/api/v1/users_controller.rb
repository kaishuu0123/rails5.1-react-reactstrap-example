class Api::V1::UsersController < Api::Base::ApplicationController
  def create
    @user = User.create! user_params

    payload = Jwt::TokenProvider.refresh_tokens @user
    payload[:user] = @user

    render json: { status: :success, data: payload }
  end

  private
  def user_params
    params.require(:user)
          .permit(:email, :password, :password_confirmation)
  end
end
