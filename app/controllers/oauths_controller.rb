class OauthsController < ApplicationController
  # skip_before_action :require_login

  def oauth
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    if @user = login_from(provider)
      tokens = Jwt::TokenProvider.refresh_tokens @user
      redirect_to "#{File.join(root_url, '#', '?')}#{tokens.to_query}", notice: "Logged in from #{provider.titleize}"
    else
      begin
        @user = create_from(provider)

        reset_session
        auto_login(@user)
        tokens = Jwt::TokenProvider.refresh_tokens @user
        redirect_to "#{File.join(root_url, '#', '?')}#{tokens.to_query}", :notice => "Logged in from #{provider.titleize}"
      rescue
        redirect_to root_path, :alert => "Failed to login from #{provider.titleize}"
      end
    end
  end
end
