class Api::Base::ApplicationController < ActionController::API
  include UserAuthenticator

  rescue_from JWT::DecodeError, with: :token_invalid
  rescue_from JWT::ExpiredSignature, with: :token_has_expired
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  private
  def token_invalid
    render json: { status: :error, message: :token_must_be_passed }, status: 401
  end

  def token_has_expired
    render json: { status: :error, message: :token_has_expired }, status: 403
  end

  def parameter_missing
    render json: {
      status: error,
      message: :parameter_missing,
      data: {
        parameter: exception.param
      }
    }, status: 400
  end

  def unauthorized
    render json: { status: :error, message: :unauthorized }, status: 401
  end

  def record_invalid
    render json: {
      status: :error,
      message: :record_invalid,
      data: exception.record.errors
    }, status: 422
  end
end